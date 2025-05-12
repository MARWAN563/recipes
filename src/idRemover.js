import fs from 'fs';

// Read the JSON file
fs.readFile('data.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  try {
    // Parse the JSON data
    const recipes = JSON.parse(data);

    // Remove the "id" field from each object
    const updatedRecipes = recipes.map(recipe => {
      const { id, ...rest } = recipe; // Destructure and exclude "id"
      return rest;
    });

    // Write the updated JSON back to the file
    fs.writeFile('data.json', JSON.stringify(updatedRecipes, null, 2), err => {
      if (err) {
        console.error('Error writing file:', err);
        return;
      }
      console.log('Successfully removed all "id" fields.');
    });
  } catch (parseError) {
    console.error('Error parsing JSON:', parseError);
  }
});