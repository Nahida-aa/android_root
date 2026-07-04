# Android Root 研究

以红米 K70 (Note 14 Pro) 为样本的 Android Root 技术研究仓库。

## 目标

系统性地研究和实践 Android Root 相关技术，包括但不限于：

- Magisk / KernelSU / LSPosed 等框架的原理与模块开发
- Boot 分区结构与内核修补
- 系统分区分析与 SELinux 策略
- 漏洞利用研究
- 设备适配与提取

## 设备信息

| 项目 | 内容 |
|------|------|
| 型号 | 红米 K70 (Note 14 Pro) — 24115RA8EC |
| 代号 | `amethyst` |
| 处理器 | 第三代骁龙 7s (SM7435-AB, ID 636, 平台 `volcano`) |
| GPU | Adreno (GPU 型号待确认) |
| Android 版本 | 16 (API 36) |
| 安全补丁 | 2026-03-01 |
| 系统版本 | BP2A.250605.031.A3 |
| 内核版本 | `6.1.138-android14-11` (aarch64, 2025-12-03) |
| SELinux | Enforcing |
| 状态 | 已提取 |

## 目录结构

```
magisk/       — Magisk 相关（模块开发、原理分析）
kernelsu/     — KernelSU 相关
lsposed/      — LSPosed / Xposed 框架
boot/         — Boot 分区解包/打包、内核修补
system/       — 系统分区分析
exploit/      — 漏洞利用研究
device/       — 设备专用资料和 adb 提取脚本
tools/        — 常用工具收集
resources/    — 外部资源与参考链接
```

## 快速开始

1. 连接手机并通过 adb 授权
2. 运行 `bun run device/scripts/extract_device_info.ts` 获取设备信息（需已安装 [Bun](https://bun.sh)）
3. 在对应分类目录下记录研究笔记
