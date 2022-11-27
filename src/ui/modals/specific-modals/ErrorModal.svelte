<script>
  import { createEventDispatcher } from "svelte";
  const { ipcRenderer } = require("electron");
  import Modal from "./Modal.svelte";

  const dispatch = createEventDispatcher();

  export let isOpen;
  export let errorData;

  let showNotLatestStable;
  let showGenericUpdateInstructionsError;
  let showSnapUpdateInstructionsError;

  function handleTryAgainButton() {
    ipcRenderer.send("user:error:reply", "restart");
    close();
  }

  function handleIgnoreButton() {
    ipcRenderer.send("user:error:reply", "ignore");
    close();
  }

  const close = () => dispatch("close");
</script>

<Modal {isOpen} on:close={close} showCloseButton={false}>
  <h4 slot="header">Yikes!</h4>
  <div slot="content">
    <p>
      由于出现问题，安装已停止。你可以选择忽略这一点，
      或者重新启动安装过程.
    </p>
    <p>
      如果这种情况继续发生，请检查您是否有同样的影响 <a
        href="https://github.com/ubports/ubports-installer/issues"
        >a known bug</a
      >.
    </p>
    <p>
      如果还不知道你的问题, 点击反馈bug.
    </p>
    <pre>{errorData}</pre>
    {#if showNotLatestStable}
      <p>
        你没有使用最新版的UBports Installer.
      </p>
    {/if}
    {#if showGenericUpdateInstructionsError}
      <p>
        你可以从<a
          href="https://github.com/ubports/ubports-installer/releases/latest"
          >下载最新版</a
        >.
      </p>
    {/if}
    {#if showSnapUpdateInstructionsError}
      <p>
        在终端运行 <code>snap refresh ubports-installer --stable</code> 安装最新版.
      </p>
    {/if}
    <p>
      如果你需要帮助可以加入我们的频道
      <a href="https://t.me/WelcomePlus">telegram</a>
      或
      <a
        href="https://matrix.to/#/!KwdniMNeTmClpgHkND:matrix.org?via=matrix.org&via=ubports.chat&via=disroot.org"
        >matrix</a
      >
      或者在论坛提问
      <a href="https://forums.ubports.com">in the forum</a>
      或
      <a href="https://askubuntu.com">askubuntu</a>.
    </p>
  </div>
  <div class="col" slot="actions">
    <button
      class="btn btn-outline-dark px-2"
      on:click={() => handleTryAgainButton()}>Try again</button
    >
    <button
      class="btn btn-outline-dark px-2"
      on:click={() => handleIgnoreButton()}>Ignore</button
    >
    <button
      id="btn-bugreport"
      class="btn btn-primary px-2"
      on:click={() => ipcRenderer.send("user:error:reply", "bugreport")}
      >Report a bug</button
    >
  </div>
</Modal>
