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
| 型号 | 红米 K70 (Note 14 Pro) |
| 代号 | _待补充_ |
| Android 版本 | _待补充_ |
| 内核版本 | _待补充_ |
| 状态 | 待提取 |

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
2. 运行 `device/scripts/` 下的提取脚本获取设备信息
3. 在对应分类目录下记录研究笔记
