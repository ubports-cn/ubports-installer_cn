<script>
  const { ipcRenderer } = require("electron");

  import {
    deviceSelectOptions,
    footerData,
    showDeveloperModeModal,
    showSelectDeviceModal
  } from "../../stores.mjs";

  ipcRenderer.on("device:wait:device-selects-ready", (event, deviceSelects) => {
    footerData.set({
      topText: "Waiting for device",
      underText: "Please connect your device with a USB cable",
      waitingDots: true
    });
    deviceSelectOptions.set(deviceSelects);
  });
</script>

<div class="row">
  <div class="col-6">
    <img
      src="./screens/Screen1.jpg"
      alt="screen1"
      style="height: 350px; margin: auto;"
    />
  </div>
  <div class="col-6">
    <h4>Welcome to the UBports Installer</h4>
    <p>
      我们将引导你进入安装过程. 不要担心, 非常简单!
    </p>
    <p>
      请打开开发者模式, 将你的手机, 平板电脑或智能手表连接至此电脑. 你的设备将被自动检测.
    </p>
    <button
      id="btn-modal-dev-mode"
      class="btn btn-primary"
      on:click={() => showDeveloperModeModal.set(true)}
    >
      如何打开开发者模式?
    </button>
    <p>
      如果没有自动检测到你的设备, 你可以手动选择. 
      请注意UBports Installer只支持
      <a href="http://devices.ubuntu-touch.io">上的设备</a>.
    </p>
    <button
      id="btn-modal-select-device"
      class="btn btn-outline-dark"
      on:click={() => showSelectDeviceModal.set(true)}
    >
      选择设备
    </button>
  </div>
</div>

<style>
  #btn-modal-dev-mode {
    margin-bottom: 10px;
  }

  button {
    width: 100%;
  }
</style>
