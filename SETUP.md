# 环境准备

Android Root 研究所用的开发环境依赖。

---

## 0. Bun (JavaScript/TypeScript 运行时)

本仓库的脚本使用 [Bun](https://bun.sh) 编写，替代 Python 作为胶水脚本语言。

```bash
# 安装
curl -fsSL https://bun.sh/install | bash

# 验证
bun --version
```

---

## 1. ADB (Android Debug Bridge)

用于与 Android 设备通信、提取信息、推送文件等。

### 安装

**Ubuntu / Debian:**
```bash
sudo apt update
sudo apt install adb fastboot
```

**Arch Linux:**
```bash
sudo pacman -S android-tools
```

**macOS (Homebrew):**
```bash
brew install android-platform-tools
```

**Windows:**
- 下载 [Google USB Driver](https://developer.android.com/studio/run/win-usb) + [Platform Tools](https://developer.android.com/studio/releases/platform-tools)
- 或将 ADB 置于 WSL 中通过 USB/IP 使用

### 验证

```bash
adb version
```

### 启用 USB 调试

1. 手机进入 `设置 → 关于手机 → 连点「MIUI 版本」7 次` 开启开发者模式
2. 进入 `设置 → 更多设置 → 开发者选项` → 开启 `USB 调试`
3. 连接电脑，运行 `adb devices` 授权

---

## 2. Fastboot

用于刷写分区、解锁 Bootloader 等。

安装方式同上（与 adb 同属 `android-tools`）。

### 验证

```bash
fastboot --version
```

---

## 3. Python 3

部分分析脚本和工具依赖 Python。

```bash
# 检查版本
python3 --version

# Ubuntu / Debian
sudo apt install python3 python3-pip
```

---

## 4. 解包/打包工具

处理 boot.img、payload.bin 等分区镜像：

```bash
# Ubuntu / Debian
sudo apt install unzip

# Python 工具（按需）
pip3 install protobuf pycryptodome  # payload-dumper-go 的 Python 替代
```

常用二进制工具（后续放入 `tools/` 目录）：
- `magiskboot` — Magisk 自带的 boot 解包/打包工具
- `payload-dumper-go` — 提取 OTA payload.bin
- `avbtool` — Android Verified Boot 工具
- `futility` — Chrome OS 内核签名工具（部分设备需要）

---

## 5. 其他可选工具

| 工具 | 用途 | 安装方式 |
|------|------|----------|
| `file` | 查看文件类型 | `sudo apt install file` |
| `binwalk` | 固件分析 | `pip3 install binwalk` |
| `simg2img` | sparse image 转换 | `sudo apt install android-sdk-libsparse-utils` |
| `dtc` | Device Tree 编译/反编译 | `sudo apt install device-tree-compiler` |

---

## 6. 设备解锁准备

> **⚠️ 解锁 Bootloader 会清除所有数据，请提前备份！**

红米 K70 (Note 14 Pro) 解锁参考：
- 小米社区申请解锁权限
- 使用 `Mi Unlock Tool` 解锁
- 解锁后 `fastboot flashing unlock` 确认

具体步骤记录在 `device/k70_note14_pro/` 下。
