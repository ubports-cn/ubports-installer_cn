<script>
  import Modal from "./Modal.svelte";
  const { ipcRenderer } = require("electron");
  import { createEventDispatcher } from "svelte";
  import { deviceSelectOptions } from "../../../stores.mjs";

  let selectedDevice;

  function selectDevice(device) {
    ipcRenderer.send("device:selected", device);
    close();
  }

  const dispatch = createEventDispatcher();
  const close = () => dispatch("close");
</script>

<Modal on:close={close}>
  <h2 slot="header">Select your device</h2>
  <div slot="content">
    <div id="device-form" class="row mb-3">
      <label for="" class="col-3 col-form-label">Device</label>
      <div class="col-9">
        <select class="form-select" bind:value={selectedDevice}>
          {#each $deviceSelectOptions as deviceSelect}
            <option value={deviceSelect.value}>
              {deviceSelect.name}
            </option>
          {/each}
        </select>
      </div>
    </div>
    <p>
      不是所有的 <a href="https://devices.ubuntu-touch.io">Ubuntu Touch 设备</a>
      都支持 UBports Installer.你可以在这里找到安装说明
      <a href="https://devices.ubuntu-touch.io">devices.ubuntu-touch.io</a>. 如果你想要帮助我们可以去
      <a href="https://github.com/ubports/installer-configs#readme"
        >贡献一个配置文件</a
      > 为所有的设备和系统!
    </p>
    <p>
      请不要安装旧的镜像. <b
        >它不一定能用!</b
      >
    </p>
  </div>
  <div slot="actions">
    <button
      class="btn btn-primary"
      disabled={!selectedDevice}
      on:click={selectDevice(selectedDevice)}>Select</button
    >
  </div>
</Modal>
