const loadJsonFiles = async () => {
    let temp_years = [1984, 2024];
    let years = Array.from({ length: temp_years[1] - temp_years[0] + 1 }, (_, index) => temp_years[0] + index);
    
    // Import JSON files for each year
    const jsonFiles = years.map(year => import(`./assets/finalized/${year}.json`));
    const jsonData = await Promise.all(jsonFiles);
    
    // Create the combined data structure
    const combinedData = jsonData.map((data, index) => ({
        players: data.default || data, 
        season: `${years[index]}` 
    }));

    return combinedData; 
};

export default loadJsonFiles;
