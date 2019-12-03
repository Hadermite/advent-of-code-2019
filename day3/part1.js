const fs = require("fs")

function main() {
	const [moves1, moves2] = fs.readFileSync(__dirname + "/input.txt")
		.toString()
		.split("\n")
		.map(line => line.split(","))

	const coordinates1 = convertMovesToCoordinates(moves1)
	const coordinates2 = convertMovesToCoordinates(moves2)

	const intersections = getIntersectionsFromCoordinates(coordinates1, coordinates2)

	const smallestDistanceCoordinate = getClosestCoordinate(intersections)

	console.log(smallestDistanceCoordinate.x + smallestDistanceCoordinate.y)
}

function convertMovesToCoordinates(moves) {
	const coordinates = []
	const currentCoordinates = { x: 0, y: 0 }

	for (const move of moves) {
		const direction = move[0]
		const movesCount = parseInt(move.substring(1))

		for (let i = 0; i < movesCount; i++) {
			switch (direction) {
				case "U":
					currentCoordinates.y++
					break
				case "D":
					currentCoordinates.y--
					break
				case "L":
					currentCoordinates.x--
					break
				case "R":
					currentCoordinates.x++
					break
				default:
					throw Error(`Unrecognized direction: ${direction}`)
			}
			coordinates.push({ ...currentCoordinates })
		}
	}

	return coordinates
}

function getIntersectionsFromCoordinates(coordinates1, coordinates2) {
	const intersections = []
	for (const coordinate1 of coordinates1) {
		for (const coordinate2 of coordinates2) {
			if (coordinate1.x === coordinate2.x && coordinate1.y === coordinate2.y)
				intersections.push({ ...coordinate1 })
		}
	}
	return intersections
}

function getClosestCoordinate(coordinates) {
	return coordinates.sort((a, b) =>
		(Math.abs(a.x) + Math.abs(a.y)) - (Math.abs(b.x) + Math.abs(b.y))
	)[0]
}

main()
