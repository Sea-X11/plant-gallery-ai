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


## Getting Started

### Prerequisites

- **Node.js** (>= 14.x)
- **Rust* (for Tauri)
- **Tauri CLI**


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

For feedback or support, please open an issue or contact the maintainer.

Enjoy exploring and contributing to **Plant Gallery AI**!

## License

This project is licensed under the [MIT License](LICENSE).

