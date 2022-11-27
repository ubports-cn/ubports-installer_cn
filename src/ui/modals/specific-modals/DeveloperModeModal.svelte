<script>
  import { Accordion, AccordionItem } from "sveltestrap";
  import { createEventDispatcher } from "svelte";
  import Modal from "./Modal.svelte";

  export let isOpen;

  const dispatch = createEventDispatcher();
  const close = () => dispatch("close");
</script>

<Modal {isOpen} on:close={close}>
  <h4 slot="header">怎样打开开发者模式</h4>
  <div slot="content" style="overflow-y: auto">
    <p>
      请选择当前设备安装的系统.
    </p>
    <Accordion>
      <AccordionItem header="Ubuntu Touch">
        <div class="row">
          <div class="col-6">
            <p>
              通过系统设置完成.
              <br />
            </p>
            <ol>
              <li>
                打开系统设置, 进入关于手机, 然后进入开发者设置.
              </li>
              <li>
                adb将会启动如果你打开了‘开发者模式’.
                注意，你必须启用某种锁屏安全(pin或密码)，如果没有启用，“开发人员模式”将是灰色的。
              </li>
              <li>
                这里的“锁定安全”菜单可以用来设置密码或密码。
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
      </AccordionItem>
      <AccordionItem header="Android">
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
      </AccordionItem>
    </Accordion>
  </div>
</Modal>
