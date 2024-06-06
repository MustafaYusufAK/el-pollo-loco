class ChangeButtons {

    world;

    /**
* Adjusts button visibility and controls when restarting the game.
* Removes the "Restart" and "Menu" buttons, and shows mobile controls.
*/
    changeButtonsOnRestartGame() {
        this.world.restartButton.classList.remove('d-flex');
        this.world.menuButton.classList.remove('d-flex');
        this.world.mobileControls.classList.remove('d-none');
    }

    /**
* Changes the visibility of buttons on the end screen.
* Hides the start button, shows the restart and menu buttons, and hides the mobile controls.
*/
    changeButtonsEndscreen() {
        this.world.startButton.classList.add('d-none');
        this.world.restartButton.classList.add('d-flex');
        this.world.menuButton.classList.add('d-flex');
        this.world.mobileControls.classList.add('d-none');
    }

    /**
* Adjusts button visibility and controls when switching to the title screen.
* Displays the "Start Game" button, hides the "Menu" and "Restart" buttons, and shows mobile controls.
*/
    changeButtonsTitle() {
        this.world.startButton.classList.add('d-flex');
        this.world.menuButton.classList.remove('d-flex');
        this.world.restartButton.classList.remove('d-flex');
        this.world.mobileControls.classList.remove('d-none');
    }

}