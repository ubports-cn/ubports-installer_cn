"use strict";

/*
 * Copyright (C) 2017-2022 UBports Foundation <info@ubports.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

const packageInfo = require("../../package.json");
const { BrowserWindow, shell, Menu } = require("electron");
const window = require("./window.js");
const udev = require("./udev.js");
const settings = require("./settings.js");
const cache = require("./cache.js");
const mainEvent = require("./mainEvent.js");
const reporter = require("./reporter.js");

class MenuManager {
  /**
   * build global application menu
   * @param {BrowserWindow} mainWindow main UBports Installer window
   */
  getMenuTemplate(mainWindow) {
    return [
      {
        label: "关于",
        submenu: [
          {
            label: "关于UBports基金会...",
            click: () => shell.openExternal("https://ubports.com")
          },
          {
            label: "关于Ubuntu Touch...",
            click: () => shell.openExternal("https://ubuntu-touch.io")
          },
          {
            label: "捐助",
            click: () => shell.openExternal("https://ubports.com/donate")
          },
          {
            label: "源码",
            click: () =>
              shell.openExternal(
                "https://github.com/ubports/ubports-installer/tree/" +
                  packageInfo.version
              )
          },
          {
            label: "开源许可证",
            click: () =>
              shell.openExternal(
                "https://github.com/ubports/ubports-installer/blob/" +
                  packageInfo.version +
                  "/LICENSE"
              )
          }
        ]
      },
      {
        label: "窗口",
        role: "window",
        submenu: [
          {
            label: "最小化",
            accelerator: "CmdOrCtrl+M",
            role: "minimize"
          },
          {
            label: "关闭",
            accelerator: "CmdOrCtrl+W",
            role: "close"
          },
          {
            label: "退出",
            accelerator: "CmdOrCtrl+Q",
            role: "close"
          }
        ]
      },
      {
        label: "工具",
        submenu: [
          {
            label: "Set udev rules",
            click: udev.set,
            visible:
              packageInfo.package !== "snap" && process.platform === "linux"
          },
          {
            label: "提交bug",
            click: () => window.send("user:report")
          },
          {
            label: "开发者工具",
            click: () => mainWindow.webContents.openDevTools()
          },
          {
            label: "清除缓存",
            click: () => cache.clean()
          },
          {
            label: "打开配置文件",
            click: () => {
              settings.openInEditor();
            },
            visible: settings.size
          },
          {
            label: "重置设置",
            click: () => {
              settings.clear();
            },
            visible: settings.size
          },
          {
            label: "Restart UBports Installer",
            click: () => {
              mainEvent.emit("restart");
            }
          }
        ]
      },
      {
        label: "设置",
        submenu: [
          {
            label: "动画",
            checked: settings.get("animations"),
            type: "checkbox",
            click: () => {
              settings.set("animations", !settings.get("animations"));
              window.send("settings:animations", settings.get("animations"));
            }
          },
          {
            label: "显示隐藏的系统镜像通道",
            checked: settings.get("systemimage.showHiddenChannels"),
            type: "checkbox",
            click: () =>
              settings.set(
                "systemimage.showHiddenChannels",
                !settings.get("systemimage.showHiddenChannels")
              )
          },
          {
            label: "Never ask for udev rules",
            checked: settings.get("never.udev"),
            visible:
              packageInfo.package !== "snap" && process.platform === "linux",
            type: "checkbox",
            click: () => settings.set("never.udev", !settings.get("never.udev"))
          },
          {
            label: "不显示驱动提示",
            checked: settings.get("never.windowsDrivers"),
            visible: process.platform === "win32",
            type: "checkbox",
            click: () =>
              settings.set(
                "never.windowsDrivers",
                !settings.get("never.windowsDrivers")
              )
          },
          {
            label: "不显示OPEN-CUTS自动报告",
            checked: settings.get("never.opencuts"),
            type: "checkbox",
            click: () =>
              settings.set("never.opencuts", !settings.get("never.opencuts"))
          },
          {
            label: "OPEN-CUTS API Token",
            click: () => reporter.tokenDialog(mainWindow)
          }
        ]
      },
      {
        label: "Help",
        submenu: [
          {
            label: "bug追踪",
            click: () =>
              shell.openExternal(
                "https://github.com/ubports/ubports-installer/issues"
              )
          },
          {
            label: "提交bug",
            click: () => window.send("user:report")
          },
          {
            label: "故障排除",
            click: () =>
              shell.openExternal(
                "https://docs.ubports.com/en/latest/userguide/install.html#troubleshooting"
              )
          },
          {
            label: "UBports 论坛",
            click: () => shell.openExternal("https://forums.ubports.com")
          },
          {
            label: "AskUbuntu",
            click: () =>
              shell.openExternal(
                "https://askubuntu.com/questions/tagged/ubuntu-touch"
              )
          },
          {
            label: "Telegram",
            click: () => shell.openExternal("https://t.me/WelcomePlus")
          }
        ]
      }
    ];
  }

  /**
   * set global application menu
   * @param {BrowserWindow} mainWindow main UBports Installer window
   */
  setMenu(mainWindow) {
    Menu.setApplicationMenu(
      Menu.buildFromTemplate(this.getMenuTemplate(mainWindow))
    );
  }
}

module.exports = new MenuManager();
