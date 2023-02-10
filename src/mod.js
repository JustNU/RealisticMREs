"use strict";

class Mod {
	postDBLoad(container) {
		const logger = container.resolve("WinstonLogger");
		const database = container.resolve("DatabaseServer").getTables();
		const modDb = require("../db/items/itemData.json");
		
		// replace iskra in database
		database.templates.items["590c5d4b86f774784e1b9c45"] = modDb.items["590c5d4b86f774784e1b9c45"];
		database.templates.prices["590c5d4b86f774784e1b9c45"] = 24000
		
		// replace western MRE
		database.templates.items["590c5f0d86f77413997acfab"] = modDb.items["590c5f0d86f77413997acfab"];
		database.templates.prices["590c5f0d86f77413997acfab"] = 27000
		
		// adjust prices	
		const iskraPrice = database.templates.handbook.Items.find(i => i.Id === "590c5d4b86f774784e1b9c45");
		iskraPrice.Price = 21125;
		
		const mrePrice = database.templates.handbook.Items.find(i => i.Id === "590c5f0d86f77413997acfab");
		mrePrice.Price = 24832;
		
		//adjust container filters
		// secured containers
		for (const item in database.templates.items) {
			if (database.templates.items[item]._parent === "5448bf274bdc2dfc2f8b456a") {
				if (database.templates.items[item]._props.Grids[0]._props.filters[0]) {
					database.templates.items[item]._props.Grids[0]._props.filters[0].Filter.push(...["590c5d4b86f774784e1b9c45", "590c5f0d86f77413997acfab"]);
				}
			}
		}
		
		// Holodilnick container
		database.templates.items["5c093db286f7740a1b2617e3"]._props.Grids[0]._props.filters[0].Filter.push(...["590c5d4b86f774784e1b9c45", "590c5f0d86f77413997acfab"]);
		
	}
	
	postAkiLoad(container) {
		// constants
		const configServer = container.resolve("ConfigServer");
		const inventoryConfig = configServer.getConfig("aki-inventory");
		const modDb = require("../db/items/itemData.json");
		
		// add iskra loot
		inventoryConfig.randomLootContainers["590c5d4b86f774784e1b9c45"] = modDb.randomLootContainers["590c5d4b86f774784e1b9c45"];
		
		// add western mre loot
		inventoryConfig.randomLootContainers["590c5f0d86f77413997acfab"] = modDb.randomLootContainers["590c5f0d86f77413997acfab"];
	}
}

	
module.exports = { mod: new Mod() }