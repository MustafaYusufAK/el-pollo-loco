class Sound {

    world;

    /**
* Starts playing the game sound if not muted and sets the sound icon to the volume icon.
*/
    startMusic() {
        if (!this.world.mute) {
            this.world.game_over.pause();
            this.world.game_sound.play();
            this.world.intro_sound.pause();
            this.world.soundIcon.src = 'img/extern_imgs/volume.png';
        }
    }

    /**
* Starts the menu music.
* Plays the intro sound if the game is not muted.
* Additionally, plays the intro sound if the volume icon is active.
*/
    startMusicMenu() {
        if (!this.world.mute)
            this.world.intro_sound.play();
        if (this.iconVolume())
            this.world.intro_sound.play();
    }

    /**
* Checks if the sound icon is currently set to the volume icon.
* @returns {boolean} - True if the sound is not muted, false otherwise.
*/
    iconVolume() {
        return this.world.soundIcon.src.includes('img/extern_imgs/volume.png');
    }

    /**
* Changes the sound icon to the mute icon and pauses the corresponding music.
* If the game is paused, pauses the intro sound; otherwise, pauses the game sound.
*/
    changeIconAndPauseMusic() {
        this.world.mute = true;
        this.world.character.sleep_sound.pause();
        if (this.world.gamePaused) {
            this.world.intro_sound.pause();
            this.world.character.sleep_sound.pause();
        } else {
            this.world.game_sound.pause();
        }
        this.world.soundIcon.src = 'img/extern_imgs/mute_Icon.png';
    }

    /**
    * Checks if the game ist paused.
    */
    checkIfGamePaused() {
        if (this.world.gamePaused)
            return;
    }

    /**
* Switches the sound icon based on the mute state.
* If muted, changes the icon to the mute icon and pauses the music; otherwise, changes the icon to the volume icon and plays the music.
*/
    switchSoundIcon() {
        if (this.iconMute()) {
            this.world.mute = false;
            this.changeIconAndPlayMusic();
        } else {
            this.changeIconAndPauseMusic();
        }
    }

    /**
* Checks if the sound icon is currently set to the mute icon.
* @returns {boolean} - True if the sound is muted, false otherwise.
*/
    iconMute() {
        return this.world.soundIcon.src.includes('img/extern_imgs/mute_Icon.png');
    }

    /**
* Changes the sound icon to the volume icon and plays the corresponding music.
* If the game is paused, plays the intro sound; otherwise, plays the game sound.
*/
    changeIconAndPlayMusic() {
        if (this.world.gamePaused) {
            this.world.intro_sound.play();
        } else {
            this.world.game_sound.play();
        }
        this.world.soundIcon.src = 'img/extern_imgs/volume.png';
    }

    /**
 * Configures the specified audio elements to loop continuously when played.
 */
    makeSoundLoop() {
        this.world.intro_sound.loop = true;
        this.world.game_sound.loop = true;
        this.world.boss_fight.loop = true;
    }

    /**
* Stops sounds and sets game over status.
*/
    stopSoundsWhenLosing() {
        this.world.character.speed = 0;
        this.world.game_over.currentTime = 0;
        this.world.game_over.play();
        this.world.character.sleep_sound.pause();
    }

    stopSoundsWhenWinning() {
        this.world.character.speed = 0;
        this.world.game_win.currentTime = 0;
        this.world.game_win.play();
        this.world.character.sleep_sound.pause();
    }

    /**
    * Mutes all playing sounds.
    */
    muteAll() {
        this.world.soundArray.forEach(sound => sound.pause());
    }

    /**
    * Checks the game status and plays the corresponding music.
    * If the game is not won, plays the game over sound; otherwise, plays the game win sound.
    */
    checkGameStatusMusic() {
        if (!this.world.win) {
            this.muteAll();
            this.stopSoundsWhenLosing();
        } else {
            this.muteAll();
            this.stopSoundsWhenWinning();
        }
    }

    /**
 * Mutes the game after a delay of 1000 milliseconds.
 */
    muteGameAfterDelay() {
        setTimeout(() => {
            this.world.mute = true;
        }, 1000);
    }

    /**
* Pauses the playback of various game sounds.
*/
    pauseSound() {
        this.world.game_sound.pause();
        this.world.hurt.pause();
        this.world.death_chicken.pause();
        this.world.death_chicks.pause();
        this.world.character.jump_sound.pause();
        this.world.boss_hurt.pause();
        this.world.collect_bottle.pause();
        this.world.collect_coin.pause();
        this.world.boss_fight.pause();
        this.world.character.sleep_sound.play();
    }

    /**
 * Plays the hurt sound effect for the end boss if not muted.
 * Marks the end boss as hurt and plays the boss hurt sound effect.
 */
    playEndbossHurtSound() {
        this.world.endboss.bossHurt = true;
        if (!this.world.mute) {
            this.world.boss_hurt.currentTime = 0;
            this.world.boss_hurt.play();
            this.world.soundArray.push(this.world.boss_hurt);

        }
    }
}