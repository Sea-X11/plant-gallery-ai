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
*Screenshot of the Plant Gallery AI home screen.*
![Plant Gallery Home](https://github.com/Sea-X11/plant-gallery-ai/blob/main/assets/home-screen.png)

*Screenshot showing the AI-powered plant recommendations.*
![AI Recommendation Example](https://github.com/Sea-X11/plant-gallery-ai/blob/main/assets/%20AI-powered%20plant%20recommendations.png )

## Screenshots
*Screenshot of the Plant Gallery AI home screen.*  
<img src="https://github.com/Sea-X11/plant-gallery-ai/blob/main/assets/home-screen.png?raw=true" alt="Plant Gallery Home" width="400"/>

*Screenshot showing the AI-powered plant recommendations.*  
<img src="https://github.com/Sea-X11/plant-gallery-ai/blob/main/assets/%20AI-powered%20plant%20recommendations.png?raw=true" alt="AI Recommendation Example" width="400"/>


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



## Contributing

Contributions are welcome! If you'd like to contribute, please fork the repository and submit a pull request. For any issues or feature requests, open an issue on GitHub.

## License

This project is licensed under the [MIT License](LICENSE).

## Additional Notes

- **Sample Images:**  
  If you wish to add your own sample images, you can create an `assets/` folder in the repository and update the links in the "Screenshots" section accordingly.
  
- **Feedback:**  
  For feedback or support, please open an issue or contact the maintainer.

Enjoy exploring and contributing to **Plant Gallery AI**!
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
