export function ModConfig(configHB) {
  if (ModConfigMenu !== undefined) {
    ModConfigMenu.RemoveCategory("Bullet Hitbox!");

    ModConfigMenu.AddSpace("Bullet Hitbox!", "About");
    ModConfigMenu.AddText("Bullet Hitbox!","About",() => "Bullet Hitbox!",);
    ModConfigMenu.AddSpace("Bullet Hitbox!", "About");
    ModConfigMenu.AddText("Bullet Hitbox!", "About", () => `Version 0.5`);

    ModConfigMenu.AddSpace("Bullet Hitbox!", "About");
    ModConfigMenu.AddText("Bullet Hitbox!", "About", () => "Mod made by Tidloas with love");
    ModConfigMenu.AddSpace("Bullet Hitbox!", "About");

    ModConfigMenu.AddSetting("Bullet Hitbox!", `Mains`, {
      CurrentSetting: (): number => configHB.Mode,
      Maximum: 2,
      Minimum: 1,
      Display() {
        let onOff = "All projectile";
        if (configHB.Mode == 2) {
          onOff = "Only curved";
        }
        return `Mode: ${onOff}`;
      },
      Info: [],
      OnChange: (currentValue: number | boolean | undefined): void => {
        configHB.Mode = currentValue as number;
      },
      Type: ModConfigMenuOptionType.NUMBER,
    });

    ModConfigMenu.AddSetting("Bullet Hitbox!", `Mains`, {
      Type: ModConfigMenuOptionType.BOOLEAN,
      CurrentSetting() {
        return configHB.Player;
      },
      Display() {
        let onOff = "Disabled";
        if (configHB.Player == true) {
          onOff = "Enabled";
        }
        return `Player: ${onOff}`;
      },
      OnChange(IsOn) {
        configHB.Player = IsOn as boolean;
      },
      Info: [`displays the player's hitbox`],
    });

    function addItem(entity, type, name, desc) {
      ModConfigMenu.AddSetting("Bullet Hitbox!", `${type}`, {
        Type: ModConfigMenuOptionType.BOOLEAN,
        CurrentSetting() {
          return configHB[entity];
        },
        Display() {
          let onOff = "Disabled";
          if (configHB[entity] == true) {
            onOff = "Enabled";
          }
          return `${name}: ${onOff}`;
        },
        OnChange(IsOn) {
          configHB[entity] = IsOn as boolean;
        },
        Info: [`${desc}`],
      });
    }
    addItem("CDPriority", "Mains", "ComingDown! priority", "If you have 'Coming down!' should the mod prioritize the coming down effect? ");
    addItem("ChangeColor", "Mains", "Change Color", "The colors of the projectiles change according to the height. Green if too high to hit you. ");


    ModConfigMenu.AddSpace("Bullet Hitbox!", "ChangeLog");
    ModConfigMenu.AddText("Bullet Hitbox!", "ChangeLog", () => "Hello World");
  }
}
