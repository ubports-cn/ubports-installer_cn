<script>
  import { createEventDispatcher } from "svelte";
  import Modal from "./Modal.svelte";

  const dispatch = createEventDispatcher();
  const close = () => dispatch("close");
</script>

<Modal on:close={close}>
  <h4 slot="header">How to enable developer mode</h4>
  <div slot="content" style="overflow-y: auto">
    <p>
      请选择当前设备安装的系统.
    </p>
    <div class="card">
      <div class="card-body">
        <h4 class="card-title">Ubuntu Touch</h4>
        <div class="row">
          <div class="col-6">
            <p>
              通过系统设置完成.
              <br />
            </p>
            <ol>
              <li>
                打开系统设置, 进入关于手机, 然后进入开发者设置
                Mode.
              </li>
              <li>
                adb将会启动如果你打开了‘开发者模式’.
                请注意，您必须具有某种锁屏密码.
              </li>
            </ol>
          </div>
          <div class="col-6">
            <img
              src="./screens/ubuntu-dev-mode.gif"
              alt="ubuntu-dev-mode"
              style="width: 100%"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-body">
        <h4 class="card-title">Android</h4>
        <div class="row">
          <div class="col-6">
            <p>
              通过系统设置完成.
              <br />
            </p>
            <ol>
              <li>
                打开系统设置，滑到最下面 "关于手机".
              </li>
              <li>
                再次滑动的最下面, 当看见 "构建版本."
              </li>
              <li>
                按下七次直到看见 "你正处于开发者模式"
              </li>
              <li>
                然后返回并找到 "开发者设置"
              </li>
              <li>
                打开usb调试和oem解锁
              </li>
            </ol>
          </div>
          <div class="col-6">
            <img
              src="./screens/android-dev-mode.gif"
              alt="android-dev-mode"
              style="width: 100%"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</Modal>
