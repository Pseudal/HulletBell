import { ModCallback, PlayerType } from "isaac-typescript-definitions";
import { printConsole } from "isaacscript-common";
import { configHB } from "./script/Config";
import { ModConfig } from "./script/modConfigMenu";
import * as json from "json";
let focusSprite = Sprite()
focusSprite.Load("gfx/Hitbox.anm2", true)
focusSprite.Color = Color(1,1,1,0.75);
focusSprite.SetFrame("1", 0)

let enemyTearHitbox = Sprite()
enemyTearHitbox.Load("gfx/ProjectileHitbox.anm2", true)
enemyTearHitbox.Color = Color(1,1,1,0.75);
enemyTearHitbox.SetFrame("1", 0)
const MOD_NAME = "Bullet Hitbox";

main();

function ShowProjectileHitbox(tearEnt: EntityProjectile){
  printConsole(`${tearEnt.CurvingStrength}`)
  0
  if(configHB.Mode == 2){
    if((tearEnt.Height <= 0 && tearEnt.Height > -200) && tearEnt.CurvingStrength > 0.01){
      enemyTearHitbox.Scale = Vector(tearEnt.Size/12,tearEnt.Size/12);
      enemyTearHitbox.Render(Isaac.WorldToScreen(tearEnt.Position),Vector(0,0));
    }
  }else{
    if(tearEnt.Height <= 0 && tearEnt.Height > -200){
      enemyTearHitbox.Scale = Vector(tearEnt.Size/12,tearEnt.Size/12);
      enemyTearHitbox.Render(Isaac.WorldToScreen(tearEnt.Position),Vector(0,0));
    }
  }

}
function ShowPlayerHitbox(Player:EntityPlayer) {
  if(configHB.Player == true){
    focusSprite.Scale = Vector(Player.Size/7.5,Player.Size/7.5);
    focusSprite.Render(Isaac.WorldToScreen(Player.Position),Vector(4,4));
  }

}

function main() {
  // Instantiate a new mod object, which grants the ability to add callback functions that
  // correspond to in-game events.
  const mod = RegisterMod(MOD_NAME, 1);

    // //! MOD CONFIG MENU
  // //steal on another mod, idk how it's work
  function postGameStarted() {
    if (mod.HasData()) {
      const loadedFromSave = json.decode(Isaac.LoadModData(mod)) as Record<
        string,
        any
      >;

      for (const [k, v] of pairs(loadedFromSave)) {
        configHB[k] = v;
      }
    }
  }

  function preGameExit() {
    mod.SaveData(json.encode(configHB));
  }

  mod.AddCallback(ModCallback.PRE_GAME_EXIT, preGameExit);
  mod.AddCallback(ModCallback.POST_GAME_STARTED, postGameStarted);

  if (ModConfigMenu !== undefined) {
    ModConfig(configHB);
  }
  // //! END MOD CONFIG MENU

  // Register a callback function that corresponds to when a new run is started.
  mod.AddCallback(ModCallback.POST_GAME_STARTED, postGameStarted);
  mod.AddCallback(ModCallback.POST_PROJECTILE_RENDER, ShowProjectileHitbox)
  mod.AddCallback(ModCallback.POST_PLAYER_RENDER, ShowPlayerHitbox)

  // Print a message to the "log.txt" file.
  Isaac.DebugString(`${MOD_NAME} initialized.`);
}

function postGameStarted() {
  Isaac.DebugString("Callback fired: POST_GAME_STARTED");
}
