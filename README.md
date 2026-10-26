# Registro de Mi Negocio Web — Paso 3: Información Bancaria

Este repositorio contiene la implementación en **HTML5, CSS3 y JavaScript puro (Vanilla)** de la pantalla asignada: **Paso 3: Información Bancaria y Validación Documental**, correspondiente al flujo de onboarding de comercios en **Tienda Bolsillo**.

---

## 📋 Características de la Implementación

* **Fidelidad al diseño:** Réplica exacta de la maqueta proporcionada, incluyendo tipografía, espaciados, colores institucionales (`#d32f2f`) y distribución en cuadrícula responsive.
* **Barra de navegación de 4 pasos:**
  1. `1. Datos tributarios`
  2. `2. Locales y horarios`
  3. `3. Información bancaria` (Paso activo resaltado en rojo)
  4. `4. Vista previa y envío`
* **Botón de datos de prueba:** Al presionar el botón `Completar con datos de ejemplo`, se llenan automáticamente todos los campos con información realista de Ecuador para facilitar demostraciones rápidas.
* **Ventana modal "Ver estado":** Muestra el progreso de cada una de las 4 secciones del registro.
* **Cajas de carga de archivos interactivas:**
  - `Selfie del titular con documento *` (JPG o PNG hasta 10 MB).
  - `Certificado bancario *` (PDF, JPG o PNG hasta 10 MB).
  - Al seleccionar un archivo se muestra el nombre y peso del documento seleccionado con un indicador de aprobación verde.
* **Gestor de cuentas bancarias adicionales:**
  - Botón interactivo `+` que abre un formulario modal para agregar cuentas secundarias.
  - Contador reactivo `Cuentas adicionales (N)` que se actualiza automáticamente.
  - Lista de cuentas agregadas con opción para eliminar.
* **Validación completa:** Verifica campos obligatorios marcados con asterisco (`*`) y longitud de cédula (10 dígitos).
* **Persistencia en sesión:** Guarda los datos en `sessionStorage` para mantener la información durante la sesión de navegación.

---

## 🚀 Cómo Ejecutar

1. Clona este repositorio o descarga los archivos:
   ```bash
   git clone https://github.com/pasantecinco/Vista-Mi-Parte.git
   ```
2. Abre el archivo `index.html` directamente en tu navegador web preferido (Google Chrome, Microsoft Edge, Firefox).
   * *No requiere Node.js, librerías externas ni servidores backend.*

---

## 📁 Estructura del Proyecto

```text
Vista-Mi-Parte/
├── index.html        # Estructura semántica del formulario y modales
├── css/
│   └── estilos.css   # Estilos limpios y organizados (grid, flexbox, responsive)
├── js/
│   └── main.js       # Lógica de validación, subida de archivos y datos de ejemplo
└── README.md         # Documentación de la entrega
```

---

## 👨‍💻 Autor

* **Juan Diego Torres Maldonado**  
* Prácticas Preprofesionales — Tienda Bolsillo
