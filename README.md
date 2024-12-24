# Freshwater Simulation Educational Website

An interactive web-based simulation that educates users about freshwater pollution, its effects on aquatic ecosystems, and cleanup methods. The project features both underwater and lakeshore perspectives to demonstrate the impact of various pollutants on freshwater environments.

# Features 
### Interactive Simulations
* **Underwater View**: Observe how pollution affects underwater life and water quality
* **Lakeshore View**: See the impact of pollution on the shoreline ecosystem and wildlife
* **Real-time Visual Changes**: Dynamic updates to water quality, wildlife, and environment based on user actions
* **Educational Facts**: Random facts about freshwater pollution displayed with each interaction

### Pollution Types
* Run-off pollution
* Industrial waste
* Oil and grease contamination
* Sewage and wastewater

### Interactive Controls 
* Add pollutants to observe their effects
* Clean up pollution and watch the ecosystem recover
* Reset button to restore initial conditions
* Real-time water quality monitoring

### Educational Components
* Fact database with citations
* Visual representation of ecosystem damage
* Immediate feedback on environmental changes
* Links to additional resources

# Technical Details
## File Structure
```
├── index.html          # Home page
├── lakeSimulation.html # Lakeshore simulation view
├── underwaterSimulation.html # Underwater simulation view
├── script.js          # Main JavaScript functionality
├── style.css         # Styling
├── randomFact.json   # Database of educational facts
└── images/           # Image assets
```

## Technologies Used
* HTML5
* CSS3
* Vanilla JavaScript
* JSON for data management

# Features Implementation 
* Dynamic image switching based on pollution levels
* Real-time calculations for water quality metrics
* Responsive design for various screen sizes
* Animated visual effects (ripples, bubbles, fish movement)

# Setup and Installation
1. Clone the repository:
```
git clone [repository-url]
```
2. No additional dependencies or build steps required - this is a static website
3. Open [index.html](index.html) in a web browser to run locally

# Usage
1. Navigate between simulations using the navigation bar
2. Use the "Pollute" buttons to add different types of pollution
3. Use the "Clean" buttons to remove pollution
4. Observe changes in:
   * Water quality percentage
   * Visual environment
   * Wildlife behavior
   * Educational facts

# Contributing 
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request
