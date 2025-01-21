import connectDB from "./db.js";
import Note from '../models/note.js'



const seedNote = [
    {
        title: "Exploring French Cuisine",
        author: 'John Doe',
        tags: ["France", "Cuisine", "Travel"],
        content: "Today, I explored the flavors of French cuisine, including croissants, escargots, and ratatouille. The markets were vibrant and filled with fresh produce."
    },
    {
        title: "A Walk Along the Seine",
        author: 'John Doe',
        tags: ["Paris", "Seine", "Walking"],
        content: "I spent the afternoon walking along the Seine. The view of Notre Dame and the Eiffel Tower in the distance was breathtaking."
    },
    {
        title: "Learning French Idioms",
        author: 'John Doe',
        tags: ["French", "Language", "Culture"],
        content: "French idioms are fascinating! For example, 'avoir un cœur d’artichaut' means 'to have a heart of an artichoke,' describing someone who falls in love easily."
    },
    {
        title: "A Day in Provence",
        author: 'John Doe',
        tags: ["Provence", "Nature", "Travel"],
        content: "Provence was stunning with its lavender fields and picturesque villages. The warm sunshine made it a perfect day to explore the countryside."
    },
    {
        title: "French Art and Museums",
        author: 'John Doe',
        tags: ["Art", "Museums", "France"],
        content: "I visited the Louvre and the Musée d'Orsay. The Mona Lisa and Van Gogh's Starry Night Over the Rhône were highlights of the trip."
    }
];



const seedDB = async () => {
    try {
        await connectDB();
        await Note.deleteMany();
        await Note.insertMany(seedNote);
        console.log("data imported successfully");
        process.exit();

    }
    catch (error) {
        console.error(`Error seeding database: ${error.message}`);
        process.exit(1);
    }
};

seedDB();