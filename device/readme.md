# Device

设备专用资料和脚本。

## 设备列表

### 红米 K70 (Note 14 Pro)

- 目录: `k70_note14_pro/`
- 型号: `24115RA8EC`
- 代号: `amethyst`
- 处理器: 第三代骁龙 7s (SM7435-AB, ID 636, 平台 `volcano`)
- GPU: Adreno
- Android 版本: 16 (API 36)
- 安全补丁: 2026-03-01
- 系统版本: `BP2A.250605.031.A3`
- 内核: `6.1.138-android14-11` (aarch64)
- SELinux: Enforcing
- 状态: 已提取 (2026-07-04)

### 提取方法

```bash
# 需要 Bun 运行环境
bun run device/scripts/extract_device_info.ts
```

## 目录

- `k70_note14_pro/info/` — 设备系统信息
- `k70_note14_pro/files/` — 提取的分区镜像、内核等
- `scripts/` — adb 提取/分析脚本
