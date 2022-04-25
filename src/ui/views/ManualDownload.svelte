<script>
  import {
    manualDownloadFileData,
    manualDownloadGroup,
    eventObject
  } from "../../stores.mjs";

  let downloadedFile;

  function handleManualDownloadButton() {
    $eventObject.sender.send(
      "manual_download:completed",
      downloadedFile[0].path
    );
  }
</script>

<div class="row">
  <div class="col-6">
    <img
      src="./screens/Screen6.jpg"
      alt="Screen6"
      style="height: 350px; margin: auto; display: block;"
    />
  </div>
  <div class="col-6">
    <h4 style="font-weight: bold;">手动下载</h4>
    <p>
      <b>{$manualDownloadGroup}</b>
      <b>{$manualDownloadFileData.name}</b> 由于许可证原因需要手动下载!
    </p>
    <p>
      请下载这些文件 <b>{$manualDownloadFileData.name}</b> 从
      <a href={$manualDownloadFileData.url}>{$manualDownloadFileData.url}</a>.
    </p>
    <p>
      下载后, 在文件选择器选择并点击继续
      
    </p>
    <div class="input-group" style="margin-bottom: 1em;">
      <div class="custom-file">
        <input type="file" bind:files={downloadedFile} />
      </div>
    </div>
    <button
      id="manual-download-button"
      class="btn btn-primary"
      disabled={!downloadedFile}
      on:click={() => handleManualDownloadButton()}>Continue</button
    >
  </div>
</div>
