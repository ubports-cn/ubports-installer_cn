<script>
  const { ipcRenderer } = require("electron");

  import {
    deviceSelectOptions,
    footerData,
    showDeveloperModeModal,
    showSelectDeviceModal
  } from "../../stores.mjs";

  let initialized = false;
  ipcRenderer.on("device:wait:device-selects-ready", (event, deviceSelects) => {
    footerData.set({
      topText: "等待设备",
      underText: "请用USB线连接您的设备",
      waitingDots: true
    });
    deviceSelectOptions.set(deviceSelects);
    initialized = true;
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
    <h4>欢迎使用ubports安装工具</h4>
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
      请注意UBports Installer只支持. 请注意，UBports安装程序将只在
      <a href="http://devices.ubuntu-touch.io">支持的设备</a>上工作
    </p>
    <button
      id="btn-modal-select-device"
      disabled={!initialized}
      class="btn btn-outline-dark"
      on:click={() => showSelectDeviceModal.set(true)}
    >
      {#if initialized}
        选择设备
      {:else}
        设备列表加载中...
      {/if}
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
