const fs = require("fs")

function main() {
    let totalFuel = 0.0

	const masses = fs.readFileSync(__dirname + "/input.txt").toString().split("\n").map(line => parseFloat(line))

	for (const mass of masses) {
		const emptyModuleFuelRequirement = getFuelRequirementByMass(mass)

		let lastAddedFuel = emptyModuleFuelRequirement
		let extraFuelRequirement = 0
		let fuelRequirement
		do {
			fuelRequirement = getFuelRequirementByMass(lastAddedFuel)
			lastAddedFuel = fuelRequirement
			extraFuelRequirement += fuelRequirement
		} while (fuelRequirement > 0)

		totalFuel += emptyModuleFuelRequirement + extraFuelRequirement
	}

    console.log(totalFuel)
}

function getFuelRequirementByMass(mass) {
	return Math.max(Math.floor(mass / 3) - 2, 0)
}

main()
