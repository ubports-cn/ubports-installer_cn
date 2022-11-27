<script>
  import { showSelectDeviceModal, deviceName } from "../../stores.mjs";
</script>

<div class="row">
  <div class="col-6">
    <img
      src="./screens/Screen5.jpg"
      alt="Screen5"
      style="height: 350px; margin: auto; display: block;"
    />
  </div>
  <div class="col-6">
    <h4 style="font-weight: bold;">设备不支持</h4>
    <p>
      你的设备:
      <span>{$deviceName}</span>
    </p>
    <p>
      <b>抱歉</b>
      , 暂时还不支持这个设备!
    </p>
    <p>
      你可以在
      <a href="http://devices.ubuntu-touch.io">devices.ubuntu-touch.io</a>
      找到更多信息
    </p>
    <hr />
    <h4 style="font-weight: bold;">你还是要尝试安装吗?</h4>
    <p>
      你可以尝试手动选择设备, 
      但必须确认你的设备已支持! 你可以去
      <a href="http://devices.ubuntu-touch.io">提交bug</a>.
    </p>
    <button
      class="btn btn-default"
      style="width: 100%;"
      on:click={() => showSelectDeviceModal.set(true)}
      >手动选择设备</button
    >
  </div>
</div>
