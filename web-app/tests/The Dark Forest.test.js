import The_Dark_Forest from "../The_Dark_Forest";
import R from "../ramda.js";


const throw_if_invalid = function (spawnVillain) {
    // Check if the villain is generated from the top of the game area
    if (window.innerHeight - villain.getBoundingClientRect().bottom != 0) {
        throw new Error(
            "The villain is not generated from the top of the game area " + display_board(board)
        );
    }
}





describe("spawnVillain", function () {
    it("The villain is not generated from the top of the game area", function () {
        const spawnVillain = The_Dark_Forest.spawnVillain();
        throw_if_invalid(spawnVillain);
    });
        }
    );