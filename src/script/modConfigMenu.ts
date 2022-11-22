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
      Info: [`Dr Foetus have a danger zone ?`],
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
//    addItem("Ipecac", "Mains", "Ipecac", "Show Ipecac zone");


    ModConfigMenu.AddSpace("Bullet Hitbox!", "ChangeLog");
    ModConfigMenu.AddText("Bullet Hitbox!", "ChangeLog", () => "Hello World");
  }
}
