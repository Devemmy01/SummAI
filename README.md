<div>
  <img src="https://github.com/user-attachments/assets/3e19446e-22ff-436a-9a1f-6083add0be60" alt="logo" style="width: 300px; height: 80px;">
</div>

<div align="center">
  <br />
      <img src="https://github.com/user-attachments/assets/ad767d90-2613-4ac4-9fc5-9a6349b6fedd" alt="Project Banner">

      
  <br />

  <h3 align="center">An AI Article Summarizer Web Application</h3>

   <div align="center">
     SummAI is an article summarizer that turns long articles, blog posts, and other text documents into condensed readable summaries, so you can read with less effort. 
  </div>
</div>

## <a name="tech-stack">⚙️ Tech Stack</a>

- React.js
- Redux
- Firebase Auth & Firestore database
- Tailwind CSS
- Framer motion
- Rapid API (https://rapidapi.com/restyler/api/article-extractor-and-summarizer)

## <a name="features">Features</a>

📱 **Modern UI**: A cutting-edge, clear user interface that provides users with a straightforward experience.

📱 **Summary Generation**: When a user inputs the URL of a long article, the web application uses artificial intelligence (AI) to provide a brief summary of the article's content.

📱 **Language options**: Provide support for summarizing articles in multiple languages.

📱 **Share summarized articles**: Allow users to share the summarized articles via social media, or messaging apps.

📱 **Summary saving**: Users can save summaries which makes it easy to keep track and review their reading history.

📱 **Copy to Clipboard**: Enables users to easily share or store the summarized content by copying it to their clipboard.

📱 **Authentication**: Users can sign in and sign out of the application.


## <a name="quick-start"> Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/Devemmy01/SummAI.git
cd SummAI
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Environment Variables**

Create a new file named `.env` in the root of your project and add the following content:

```env
VITE_SUM_API_KEY=
```

Replace the placeholder values with your actual API Key. You can get your api key by signing up and subcribing to the API for free on the [Rapid API website](https://rapidapi.com/restyler/api/article-extractor-and-summarizer/).

**Running the Project**

```bash
npm run dev
```

Set up your firebase project and replace the firebase config file in this repo with yours

Open [http://localhost:5173](http://localhost:5173) in your browser to view the project.
