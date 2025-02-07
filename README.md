# plant-gallery-ai 
Plant-Gallery-ai uses React and Next.js to create a web-based plant image gallery, and is packaged as an Android APK using Tauri.  The app allows users to browse the gallery, search for plants, and get AI-driven recommendations from text or image input

## Features

- **Dynamic Plant Search:**  
  Easily search for plants by keywords. The gallery updates dynamically based on your input.

- **AI-Powered Recommendations:**  
  Get personalized plant recommendations using AI, based on search queries or images you upload.

- **Responsive and Interactive UI:**  
  A sleek user interface built with modern web technologies, ensuring smooth navigation and viewing experience.

- **Tauri-Powered APK:**  
  The web application is packaged into an Android APK using Tauri, combining the ease of web development with native mobile performance.

## Screenshots

*Note: Replace the placeholder image links below with your own images. One easy way to host sample images is to create an `assets/` folder in your repository and add your images there. Then reference them like `![Screenshot](assets/sample-image.png)`.*

![Plant Gallery Home](https://via.placeholder.com/600x400?text=Plant+Gallery+Home)
*Screenshot of the Plant Gallery home screen.*

![AI Recommendation Example](https://via.placeholder.com/600x400?text=AI+Recommendation+Example)
*Screenshot showing the AI-powered plant recommendations.*

## Getting Started

### Prerequisites

- **Node.js** (>= 14.x)
- **Rust & Cargo** (for Tauri)
- **Tauri CLI:** 


### Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/yourusername/plant-gallery-ai.git
   cd plant-gallery-ai
   ```

2. **Install Frontend Dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the Development Server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Start Tauri in Development Mode:**
   ```bash
   npm install -D @tauri-apps/cli@latest
   npm run tauri dev
   ```
### Building the APK

5. **Build the Tauri APK:**
   ```bash
   npm run tauri android dev
   npm run tauri android build
   ```


## Project Structure

```
plant-gallery-ai/
├── assets/              # Place sample images here (e.g., screenshots)
├── src/                 # Frontend source code
├── public/              # Public assets for the frontend
├── src-tauri/           # Tauri-specific backend code and configuration
├── package.json         # Frontend package configuration
├── .gitignore
└── README.md
```

## Contributing

Contributions are welcome! If you'd like to contribute, please fork the repository and submit a pull request. For any issues or feature requests, open an issue on GitHub.

## License

This project is licensed under the [MIT License](LICENSE).

## Additional Notes

- **Sample Images:**  
  If you wish to add your own sample images, you can create an `assets/` folder in the repository and update the links in the "Screenshots" section accordingly.
  
- **Feedback:**  
  For feedback or support, please open an issue or contact the maintainer.

Enjoy exploring and contributing to **Plant Gallery**!
```

---

### Explanation

- **Screenshots Section:**  
  The sample image links use placeholder URLs (`via.placeholder.com`). Replace these with your actual image paths once you upload your images. One common approach is to add the images to an `assets` folder in your repository and reference them using relative paths (e.g., `assets/screenshot1.png`).

- **Project Structure:**  
  The structure provides clarity on where the frontend, Tauri backend, and assets reside.

- **Installation and Build Instructions:**  
  Clear steps guide the user from cloning the repository to running and building the application.

Feel free to modify or extend the README to better suit your project's needs.
