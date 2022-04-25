<script>
  const { ipcRenderer } = require("electron");
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
    <h4 style="font-weight: bold;">Success!</h4>
    <p>
      电脑部分的安装过程已经完成。
      该设备将立即启动执行其余步骤，所需时间应少于五分钟。
      安装完成后，设备将重新启动，您可以开始探索Ubuntu Touch。
    </p>
    <p>
      有发现不喜欢的地方? <a
        href="https://github.com/ubports/ubports-touch">请告诉我们</a
      >, 或者帮助我们改正!
    </p>
    <p>
      Ubuntu Touch是由 <a href="https://ubports.com"
        >UBports Community开发</a
      >. <a href="https://ubports.com/donate">Donate</a> 让我们继续我们的任务
      <a
        class="btn btn-default"
        style="width: 49%; margin-bottom: 10px; margin-right: 5px"
        href="https://ubports.com/join-us">参与我们</a
      >
      <a
        class="btn btn-primary"
        style="width: 49%; margin-bottom: 10px;"
        href="https://ubports.com/donate">捐助</a
      >
    </p>
    <p>
      继续安装更多的设备?
      <button
        class="btn btn-info"
        style="width: 100%;"
        on:click={() => ipcRenderer.send("restart")}
        >安装另一个设备!</button
      >
    </p>
  </div>
</div>
