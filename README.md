![](public/brand.png)

<div align="center">

Github Stars Repositories Manager

</div>

## 🎯 Background

As the first social platform for developers, Github has countless excellent open source projects, which brings great convenience to work and study. When you encounter a project you need or like, just click Star to get it.

Star is easy, but as the number of Starred Repositories grows, it is inevitable that you can’t remember the name of a certain project when you need to use it, and Github only provides a simple search, so finding the target Starred Repository has become a little troublesome.

Therefore, having your own Github Stars Repositories Manager is also a must-have for developers. 💡

## 👀 Discover good projects: Gitstars Ranking (2023-09-09)

<strong>Gitstars Ranking</strong>: Helps you discover the top 100 good projects with the number of Github Stars. It supports various programming language categories and is updated daily.

![](public/example-github-ranking.png)

## 🚀 Quickly find your Star’s warehouse: Your Stars

<strong>Your Stars</strong>: Organize your Stars warehouse and classify it according to Topics and Language to help you quickly find target projects.

![](public/example-your-stars.png)

## 👻 Other features

- <strong>README.md preview</strong>: No need to jump to Github to view README.md, you can view it on Gitstars;
- <strong>Direct link</strong>: Github warehouse, project website;

## 📖 illustrate

### Topics: Warehouse label set

The tag set is defined by the Repository author and is generally keywords related to the Repository, mostly in English.

![](public/example-topics.png)

### Language: The main programming language of the warehouse

Github will statistically analyze the files of the Repository and determine the main programming language of the Repository.

![](public/example-languages.png)

## 🤖 Vercel deployment

## Fork the Project

![image](https://github.com/cfour-hi/gitstars/assets/8335856/2550b86b-8469-45d0-9b4e-d8f91cc680d1)

## Create a Github OAuth App

Go to Settings - Developer Settings - OAuth Apps.

![No OAuth application](https://github.com/cfour-hi/gitstars/assets/8335856/889537d1-ae6b-481a-b054-8802df9182e1)

Click the "Register a new application" button to create an app.

![Register a new OAuth application](https://github.com/cfour-hi/gitstars/assets/8335856/64f37cca-6055-4d67-8a81-84159d1a9f8a)

Think of a name for your Vercel project first. In the example above, the project name is `gitstars-cfour-hi`, and the final Vercel project access URL will be [https://gitstars-cfour-hi.vercel.app](https://gitstars-cfour-hi.vercel.app).

Enter the access URL in both the Homepage URL and the Authorization callback URL fields.

After creation, the app settings page will open.

![Mivarxed](https://github.com/cfour-hi/gitstars/assets/8335856/6de209af-663a-4231-8069-54ce65995f71)

The app settings page will display the Client ID, which will be added to the Vercel project environment variables later.

Click the "Generate a new client secret" button to add a new secret key.

![Qitstars](https://github.com/cfour-hi/gitstars/assets/8335856/64a87538-8754-4063-bf94-d17296afb370)

Note: The secret key will be shown only once, so make sure to save it.

Similarly, the secret key will also be added to the Vercel project environment variables later.

## Create a Vercel Project

![Let's build something new](https://github.com/cfour-hi/gitstars/assets/8335856/680c557e-5936-4038-9eb2-9ad651c7ba7a)

After adding your Github account, all Github repositories will be displayed.

Find `gitstars`, and click the "Import" button to enter the Configure Project page.

![Configure Project](https://github.com/cfour-hi/gitstars/assets/8335856/35feb006-61ff-4ea7-9cb6-184e475be143)

Enter the Vercel project name you thought of earlier in the Project Name field.

Add two environment variables:

1. VITE_GITSTARS_CLIENT_ID
2. VITE_GITSTARS_CLIENT_SECRET

After configuration, click the "Deploy" button at the bottom to start the deployment.

Wait a moment, and upon successful deployment, the following content will appear.

![Congratulations!](https://github.com/cfour-hi/gitstars/assets/8335856/cd930692-dccf-4286-8c5c-c35c316c21f1)

Click the "Continue to Dashboard" button in the top right corner to enter the Vercel project details page.

<img width="632" alt="gitstars-cfour-hi" src="https://github.com/cfour-hi/gitstars/assets/8335856/f659cf91-eeaa-4c11-9661-69c08e37f386">

Open [https://gitstars-cfour-hi.vercel.app](https://gitstars-cfour-hi.vercel.app)

<img width="1552" alt="Pasted Graphic 22" src="https://github.com/cfour-hi/gitstars/assets/8335856/e015b9cb-08f5-4594-8c2f-ffc61ad50409">
