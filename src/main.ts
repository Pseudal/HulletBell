import { ModCallback } from "isaac-typescript-definitions";
import { configHB } from "./script/Config";
import { ModConfig } from "./script/modConfigMenu";
import * as json from "json";
declare const CDComp : unknown | undefined;
interface CDReturn {
  Return: int | undefined;
}
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
  if(configHB.Enable == true){
    let data = tearEnt.GetData() as unknown as CDReturn
    if(CDComp !== undefined){
      if((CDComp.IRFconfig.AllProjectile == true && configHB.CDPriority) || (CDComp.IRFconfig.RockFall && tearEnt.Variant == 9)){
        if(tearEnt.Height < -200 && data.Return !== 1){
          data.Return = 1
        }
      }
    }

    if(configHB.Mode == 2){
      if((tearEnt.Height <= 0 ) && tearEnt.CurvingStrength > 0.01 && data.Return !== 1){
        enemyTearHitbox.Scale = Vector((5/13)*tearEnt.Scale,(5/13)*tearEnt.Scale);
        enemyTearHitbox.Render(Isaac.WorldToScreen(tearEnt.Position),Vector(0,0));
        if(tearEnt.Height < -70 && configHB.ChangeColor == true){
          enemyTearHitbox.Color = Color(0,255,0,0.75)
        }
        else{
          enemyTearHitbox.Color = Color(1,1,1,0.75);
        }
      }
    }else{
      if(tearEnt.Height <= 0 && data.Return !== 1){
        enemyTearHitbox.Scale = Vector((tearEnt.Size/13)*tearEnt.Scale,(tearEnt.Size/13)*tearEnt.Scale);
        enemyTearHitbox.Render(Isaac.WorldToScreen(tearEnt.Position),Vector(0,0));
        if(tearEnt.Height < -70 && configHB.ChangeColor == true){
          enemyTearHitbox.Color = Color(0,255,0,0.75)
        }
        else{
          enemyTearHitbox.Color = Color(1,1,1,0.75);
        }
      }
    }
  }
}
function ShowPlayerHitbox(Player:EntityPlayer) {

  if(configHB.Player == true && configHB.Enable == true){
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
  mod.AddCallback(ModCallback.POST_PROJECTILE_RENDER, ShowProjectileHitbox)
  mod.AddCallback(ModCallback.POST_PLAYER_RENDER, ShowPlayerHitbox)
}

