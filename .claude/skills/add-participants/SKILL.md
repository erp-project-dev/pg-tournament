---
name: add-participants
description: Agrega o actualiza participantes del concurso en la web (sección "Participantes" de src/Landing.tsx), baja su foto de perfil de Instagram, compila y hace push a main. Usar cuando el usuario pegue filas del sheet de participantes o diga "agrega participantes".
---

# Agregar participantes

El usuario pega filas del sheet "Participantes" (tabuladas), con columnas:
`Username | Nombre | Link del reel | Link a su cuenta de IG`. La columna de IG se ignora: se arma desde el username.

## Pasos

1. **Leer la lista actual** `PARTICIPANTS` en `src/Landing.tsx`. Cada entrada es:
   ```ts
   { user: "abel.vega", name: "Abel Vega", reel: "https://www.instagram.com/p/DeS_lvqOHvw/" },
   ```
2. **Fusionar** las filas pegadas:
   - Mantener el orden del sheet: el número de cada tarjeta (01, 02…) sale de la posición en el array.
   - Si el `user` ya existe, actualizar nombre/reel; si no, agregar al final.
   - Normalizar `reel` con `/` final. Copiar links y nombres tal cual (acentos incluidos); nunca transcribir links desde una captura, pedir el texto.
   - No borrar a nadie salvo que el usuario lo pida.
3. **Fotos** solo de los usuarios nuevos (o los que fallaron antes):
   ```bash
   .claude/skills/add-participants/fetch-photos.sh usuario1 usuario2
   ```
   Son 100×100, suficientes para el avatar de 48 px. Si alguna falla, no pasa nada: la tarjeta muestra las iniciales. Reportar cuáles fallaron.
4. **Compilar**: `npm run build` debe terminar en `✓ built`.
5. **Commit y push a main**:
   ```bash
   git add src/Landing.tsx public/participants
   git commit -m "feat: agregar participantes (<n> nuevos)"
   git push origin main
   ```
   El push dispara el deploy en GitHub Actions.
6. **Reportar**: cuántos se agregaron/actualizaron, total, fotos fallidas y hash del commit.

## No tocar

El markup y los estilos de la sección (`.entrants`, `.entrant-*` en `src/styles.css`) ya están resueltos: número en la esquina, avatar con foto e iniciales de respaldo, botón "Ver su solo" fijo al fondo. Este skill solo cambia datos y fotos.
