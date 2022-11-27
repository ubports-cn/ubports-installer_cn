<script>
  import { createEventDispatcher } from "svelte";
  const { ipcRenderer } = require("electron");
  import Modal from "./Modal.svelte";

  const dispatch = createEventDispatcher();

  export let isOpen;
  export let showDoNotAskAgainButton;

  function report(result) {
    ipcRenderer.send("reportResult", result);
    close();
  }

  function handleResultDoNotAskAgainButton() {
    ipcRenderer.invoke("setSettingsValue", "never.opencuts", true);
    close();
  }

  const close = () => dispatch("close");
</script>

<Modal {isOpen} on:close={close} showCloseButton={false}>
  <h4 slot="header">Report your result</h4>
  <div slot="content">
    <p>
      要解决UBports安装程序中的问题，开发人员必须
      接受详细的反馈。为了简化这一过程，安装程序会自动执行
      报告过程。如果你有兴趣帮助我们制作ubport
      更好，继续阅读！如果没有，请单击下面的按钮，我们将
      别再打扰你了。
    </p>
    <p>
      The UBports Community uses <a
        href="https://ubports.open-cuts.org/system/5e9d746c6346e112514cfec7"
        >OPEN-CUTS, the open crowdsourced user testing suite</a
      >
      to manage manual testing and
      <a href="https://github.com/ubports/ubports-installer/issues">GitHub</a> to
      track bugs and feature requests for the UBports Installer. Since the installer
      developers rarely have access to all the devices the installer supports, it
      is vital for them to also receive reports about what works.
    </p>
    <p>
      Select a result from the buttons below. You will see another window where
      you can explain your experience in more detail and modify all the data
      before submitting.
    </p>
    <p>
      Select the <b>PASS</b> option if everything worked as expected. If you
      experienced minor issues or annoyances, but finally succeeded in
      installing your device, select the <b>WONKY</b> result. The <b>FAIL</b> result
      indicates a more severe problem.
    </p>
  </div>
  <div slot="actions">
    {#if showDoNotAskAgainButton}
      <button
        class="btn btn-default"
        id="resultDoNotAskAgain"
        on:click={() => handleResultDoNotAskAgainButton()}
        >No, don't ask me again</button
      >
    {/if}
    <button class="btn btn-secondary" on:click={() => close()}>Dismiss</button>
    <button class="btn btn-success" on:click={() => report("PASS")}>PASS</button
    >
    <button class="btn btn-warning" on:click={() => report("WONKY")}
      >WONKY</button
    >
    <button class="btn btn-danger" on:click={() => report("FAIL")}>FAIL</button>
  </div>
</Modal>
