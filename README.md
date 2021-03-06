# CS-game-of-life


## Hosted Website
https://cs-game-of-life-mauve.vercel.app/


## Rubric
`Your simulation will receive a 2 when it satisfies the following:`
- [X] Display includes a text area that shows the current generation of cells being displayed
- [X] Display includes a grid of cells, at least 25x25, that can be toggled to be alive or dead
- [X] Display includes working buttons that start / stop the animation and clear the grid
- [X] Algorithm to generate new generations of cells correctly implemented
- [X] At least `3 features` from Custom Features section successfully implemented
- [X] Application includes a section outlining the rules to Conway's "Game of Life"


## Custom Features
`Implement at least 3 of the following features:`
- [ ] Create a few sample cell configurations that users can load and run
- [X] Add an option that creates a random cell configuration that users can run
- [ ] Add additional cell properties, like color or size, and incorporate them into your visualization
- [X] Allow users to specify the speed of the simulation
- [ ] Provide functionality to manually step through the simulation one generation at a time, as opposed to animating automatically
- [X] Allow users to change the dimension of the grid being displayed
- [ ] Given a specific generation, calculate the configuration of cells at that point in time, and jump to that state, bypassing animation (i.e. skip ahead n generations)
**If you have an idea for a custom feature on this list, run it by your TL or instructor**


## Rules of Conways Game of Life
1. Any live cell with fewer than two live neighbours dies, as if by underpopulation
2. Any live cell with two or three live neighbours lives on to the next generation
3. Any live cell with more than three live neighbours dies, as if by overpopulation
4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction

`compared to real life:`
1. Any live cell with two or three live neighbours survives
2. Any dead cell with three live neighbours becomes a live cell
3. All other live cells die in the next generation. Similarly, all other dead cells stay dead

`not aloud:`
1. There should be no explosive growth
2. There should exist small initial patterns with chaotic, unpredictable outcomes
3. There should be potential for von Neumann universal constructors
4. The rules should be as simple as possible, whilst adhering to the above constraints


## Building My App
Visualizing the "Game of Life" 👇

`The main entry point of your application should house the visualization of this cellular automaton. Include necessary components, such as:`
* grid to display cells.
* cell objects or components that, at a minimum, should have:
    * properties: current state: (alive, dead), (black, white)

`Clickable/Tappable:`
* can be clicked to allow user to setup initial cell configuration should NOT be clickable while simulation is running

`Behaviors:`
* toggle state functionality - switch between alive & dead either because user manually toggled cell before starting simulation or simulation is running and rules of life caused cell to change state
* an appropriate data structure to hold a grid of cells that is at least 25x25 - go as big as you want
* text to display current generation number being displayed
* utilize a timeout function to build the next generation of cells & update the display at the chosen time interval
* button(s) that start & stop the animation
* button to clear the grid

`Write an algorithm that implements the following basic steps:`
* for each cell in the current generation's grid:
    * examine state of all eight neighbors - it's up to you whether you want cells to wrap around the grid and consider cells on the other side or not
    * apply rules of life to determine if this cell will change states

* when main loop completes:
    * swap current and next grids
    * repeat until simulation stopped
    * breaks down above steps into appropriate sub-tasks implemented with helper functions to improve readability
    * uses double buffering to update grid with next generation.
    * does something well-documented with the edge of the grid. (e.g. wrap around to the far side--most fun!--or assumes all edge cells are permanently dead)
