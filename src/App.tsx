import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import AppRouter from "./router";

function App() {
  return (
    <>
      <div className="min-h-screen bg-gray-800 text-white px-4 sm:px-6 md:px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <NavBar />

          <div className="py-10 pb-10">
            <AppRouter />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
