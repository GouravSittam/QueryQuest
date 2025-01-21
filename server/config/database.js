MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true })
    .then(client => {
        db = client.db(); // Use the default database
        console.log('Connected to MongoDB');
        app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
    })
    .catch(error => console.error(error));

