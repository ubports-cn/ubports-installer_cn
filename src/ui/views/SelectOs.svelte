<script>
  const { ipcRenderer } = require("electron");

  import {
    osSelectOptions,
    installConfigData,
    showDeveloperModeModal
  } from "../../stores.mjs";

  let selectedOs;

  function handleInstallButton() {
    ipcRenderer.send("os:selected", selectedOs);
  }
</script>

<div class="row">
  <div class="col-6">
    <img
      src="./screens/Screen6.jpg"
      alt="Screen6"
      style="height: 350px; margin: auto; display: flex;"
    />
  </div>
  <div class="col-6">
    <h4 style="font-weight: bold;">
      {$installConfigData.name} ({$installConfigData.codename})
    </h4>
    <p>
      <a
        href={`https://devices.ubuntu-touch.io/device/${$installConfigData.codename}`}
        >关于此设备</a
      >
      <a
        href={`https://github.com/ubports/installer-configs/blob/master/v2/devices/${$installConfigData.codename}.yml`}
        >查看配置文件</a
      >
    </p>
    <p>
      请确认你已开启 <a
        href
        on:click|preventDefault={() => showDeveloperModeModal.set(true)}
        >开发者模式和oem解锁</a
      >.
    </p>
    <p>请选择你需要安装的系统</p>
    <div class="form row">
      <div class="col-3">
        <label for="" class="col-form-label">OS</label>
      </div>
      <div class="col-9">
        <select class="form-select" bind:value={selectedOs}>
          {#each $osSelectOptions as osSelect}
            <option value={osSelect.value}>
              {osSelect.name}
            </option>
          {/each}
        </select>
      </div>
    </div>
    <button
      class="btn btn-primary mt-3"
      style="width: 100%;"
      on:click={() => handleInstallButton()}
    >
      安装
    </button>
  </div>
</div>
