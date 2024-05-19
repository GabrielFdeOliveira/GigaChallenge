# Giga Challenge

The challenge provides a simplified explanation of how Gigaclear calculates the cost of its infrastructure. Each POT (Point of Termination) is connected to a cabinet via cable buried in either verge (soft ground) or road (tarmac), and to chambers. The problem includes a visualization of the infrastructure and a textual representation in graph format. Two rate cards (Rate Card A and Rate Card B) with different costs were provided, and the task is to create a program to load the provided file and calculate the costs of building said infrastructure based on both rate cards.

## Plan to Tackle the Task

1- Initial Setup with Hardcoded Data:

    Begin with a hardcoded object to represent the graph data. This allows focus on the core logic before handling file import.

2- Clearly define the costs associated with each rate card. For instance:

    Rate Card A:
        Cabinet: £1000
        Trench/m (verge): £50
        Trench/m (road): £100
        Chamber: £200
        POT: £100
    Rate Card B:
        Cabinet: £1200
        Trench/m (verge): £40
        Trench/m (road): £80
        Chamber: £200
        POT: £20 * trench length from cabinet

3- Parse Graph data

    Identify componets, connections and their properties from the hardcoded object or parsed .graphml data.

4- Implement logic to calculate the total cost for each rate card:

    Iterate through the components and connections of the graph.
    For each components, add the cost based on its type.
    For each connections, calculate the trench cost based on its length and material.

5- Output the Results:

    Print the total costs calculated for both rate cards.

6- Replace Hardcoded Data with File Import:

    Replace the initial hardcoded graph data with actual data imported from the .dot file.
    Use dotparser for graph manipulation.

7- Adjust the logic accordingly.

    Since the data is coming from somewhere else, we must update the logic to reflect that.

## How to install and run de code

1- Make sure you have Node.js and npm installed on your computer, if not, [go to the official website](https://nodejs.org/en)

2- Clone this repository to your local machine using:

    git clone https://github.com/GabrielFdeOliveira/GigaChallenge.git

3- Navigate to the project directory:

    cd GigaChallenge

4- Install dependencies using npm:

    npm install

5- Run the script:

    node index.mjs
