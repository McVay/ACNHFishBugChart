/**
 * Swaps the settings for hemisphere (not used)
 */
function swapHemisphere(){
    if(webStorage.settings.hemisphere == "north"){
        webStorage.settings.hemisphere = "south";
    }else{
        webStorage.settings.hemisphere = "north";
    }
    save("Hemisphere Changed");
    d3.select("#hemisphereButton").html(webStorage.settings.hemisphere + " Hemisphere");
    checkDate();
}

/**
 * 
 * @param {String} filter Any keyword to search the object's values for.
 * @param {String} critterType Type of critter "bug" or "fish"
 */
function addCritterFilter(filter,critterType){
    let filterList = critterType == "fish"? webStorage.settings.filter.fish:webStorage.settings.filter.bug;

    // Check the current filter is already applied
    if(!filterList.includes(filter)){
        // Add the filter
        filterList.push(filter);
    }else{
        console.error("Trying to add filter which is already added!");
    }
}

/**
 * 
 * @param {String} filter Any keyword to search the object's values for.
 * @param {String} critterType Type of critter "bug" or "fish"
 */
function removeCritterFilter(filter,critterType){
    let filterList = critterType == "fish"? webStorage.settings.filter.fish:webStorage.settings.filter.bug;

    // Check the current filter is already applied
    if(filterList.includes(filter)){
        // Remove the filter
        filterList.splice(filterList.indexOf(filter),1);
    }else{
        console.error("Trying to remove filter which does not exist!");
    }
}

/**
 * Searches the list of critters for matching names
 * @param {String} searchString Name of the critter
 * @param {String} critterType Type of critter "bug" or "fish"
 */
function searchCritter(searchString, critterType){
    let searchList = critterType == "fish"? fishData:bugData;

    let regex = new RegExp(`.*${searchString.toLowerCase()}.*`);

    let validCritters = [];

    for(let critter of searchList){
        if(regex.exec(critter.name.toLowerCase())){
            validCritters.push(critter);
        }
    }

    updateCards(validCritters);
}

/**
 * Toggles the current settings for showing Donated critters
 */
function toggleShowDonated(){
    webStorage.settings.showDonated = !webStorage.settings.showDonated;
    save("Toggled showDonated");
    checkDate();
}

/**
 * Toggles the current settings for showing nonDonated critters
 */
function toggleShowNonDonated(){
    webStorage.settings.showNonDonated = !webStorage.settings.showNonDonated;
    save("Toggled showNonDonated");
    checkDate();
}