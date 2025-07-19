import "dotenv/config";
import { google } from "googleapis";
import { writeFileSync } from "fs";
import ora from "ora";

const { GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY, SPREADSHEET_ID } = process.env;

const EXCLUDED_COLUMNS = ["email"];

function _getAuth() {
  return new google.auth.JWT({
    email: GOOGLE_CLIENT_EMAIL,
    key: GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });
}

function tryParseDate(value) {
  const regex = /^(\d{1,2})\/(\d{1,2})\/(\d{4}) (\d{1,2}):(\d{2}):(\d{2})$/;
  const match = value.match(regex);
  if (!match) return value;
  const [, day, month, year, hour, minute, second] = match.map(Number);
  const limaDate = new Date(
    Date.UTC(year, month - 1, day, hour + 5, minute, second)
  );
  return limaDate.toISOString().replace(/\.\d{3}Z$/, "Z");
}

function normalizeValue(value) {
  if (value === undefined || value === "") return "";
  const dateRegex = /^\d{1,2}\/\d{1,2}\/\d{4} \d{1,2}:\d{2}:\d{2}$/;
  if (dateRegex.test(value)) return tryParseDate(value);
  if (!isNaN(Number(value))) return Number(value);
  if (value.toLowerCase() === "true") return true;
  if (value.toLowerCase() === "false") return false;
  return value;
}

async function _readSheet(sheetName) {
  const spinner = ora(`Fetching sheet: ${sheetName}`).start();
  const sheets = google.sheets({ version: "v4", auth: _getAuth() });

  try {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${sheetName}!B2:Z`,
    });

    const rows = res.data.values;
    if (!rows || rows.length === 0) {
      spinner.warn(`No data in ${sheetName}`);
      return [];
    }

    const rawHeaders = rows[0];
    const allowedHeaders = rawHeaders
      .map((h, i) => [h, i])
      .filter(([header]) => !EXCLUDED_COLUMNS.includes(header.toLowerCase()));

    const data = rows.slice(1).map((row) =>
      Object.fromEntries(
        allowedHeaders.map(([header, colIndex]) => {
          const value = row[colIndex];
          const normalized = normalizeValue(value);
          return [header, normalized];
        })
      )
    );

    spinner.succeed(`Done: ${sheetName}`);
    return data;
  } catch (err) {
    spinner.fail(`Error fetching ${sheetName}`);
    throw err;
  }
}

function createDataJson(result) {
  writeFileSync("data.json", JSON.stringify(result, null, 2));
}

(async () => {
  try {
    const result = {
      Players: await _readSheet("Players"),
      PlayerSummary: await _readSheet("PlayerSummary"),
      Phases: await _readSheet("Phases"),
      Groups: await _readSheet("Groups"),
      PhaseBattles: await _readSheet("PhaseBattles"),
      Settings: await _readSheet("Settings"),
    };

    createDataJson(result);
    console.log("📁 data.json created successfully.");
  } catch (err) {
    console.error("❌ Error reading sheet:", err.message);
    process.exit(1);
  }
})();
