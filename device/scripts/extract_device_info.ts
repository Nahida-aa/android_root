#!/usr/bin/env bun
/**
 * 提取 Android 设备信息
 * 用法: bun run device/scripts/extract_device_info.ts
 * 输出到 device/k70_note14_pro/info/
 */

import { $ } from "bun";
import { mkdir, writeFile } from "fs/promises";
import { join } from "path";

const OUT_DIR = "device/k70_note14_pro/info";

async function run() {
  await mkdir(OUT_DIR, { recursive: true });

  console.log("=".repeat(50));
  console.log("  提取设备信息");
  console.log(`  输出目录: ${OUT_DIR}`);
  console.log("=".repeat(50));

  // 1. 设备基本信息
  console.log("[1/6] 设备基本信息...");
  const props = [
    "ro.product.model",
    "ro.product.name",
    "ro.product.device",
    "ro.product.board",
    "ro.product.manufacturer",
    "ro.build.version.release",
    "ro.build.version.sdk",
    "ro.build.version.security_patch",
    "ro.build.display.id",
  ];
  const propLines: string[] = [];
  for (const p of props) {
    const val = await $`adb shell getprop ${p}`.text();
    propLines.push(`${p}=${val.trim()}`);
  }

  const kernel = await $`adb shell uname -a`.text();
  const kernelVer = await $`adb shell cat /proc/version`.text();
  const now = new Date().toISOString().replace("T", " ").slice(0, 19);

  const deviceInfo = [
    "# 设备基本信息",
    `生成时间: ${now}`,
    "",
    "## ro 属性",
    ...propLines,
    "",
    "## 版本信息",
    ...propLines.filter((l) => l.startsWith("ro.build.")),
    "",
    "## 内核",
    kernel.trim(),
    kernelVer.trim(),
  ].join("\n");

  await writeFile(join(OUT_DIR, "device_info.txt"), deviceInfo);
  console.log(`  → 写入 device_info.txt`);

  // 2. 分区表（/proc/partitions 需要 root，用 by-name 代替）
  console.log("[2/6] 分区表...");
  let partitions: string;
  try {
    partitions = await $`adb shell ls -la /dev/block/by-name/`.text();
  } catch {
    partitions = "(无法访问 /dev/block/by-name/)";
  }
  await writeFile(join(OUT_DIR, "partitions.txt"), `# 分区表\n\n## /dev/block/by-name/\n${partitions}`);
  console.log(`  → 写入 partitions.txt`);

  // 3. 系统属性
  console.log("[3/6] 系统属性 (getprop)...");
  const allProps = await $`adb shell getprop`.text();
  await writeFile(join(OUT_DIR, "getprop_all.txt"), allProps);
  const propCount = allProps.split("\n").length;
  console.log(`  → ${propCount} 条属性 → getprop_all.txt`);

  // 4. SELinux
  console.log("[4/6] SELinux...");
  const seLinux = await $`adb shell getenforce`.text();
  await writeFile(
    join(OUT_DIR, "selinux.txt"),
    `# SELinux\n\n${seLinux.trim()}\n`
  );
  console.log(`  → ${seLinux.trim()} → selinux.txt`);

  // 5. 挂载信息
  console.log("[5/6] 挂载信息...");
  const mount = await $`adb shell mount`.text();
  await writeFile(join(OUT_DIR, "mount.txt"), mount);
  const mountCount = mount.split("\n").length;
  console.log(`  → ${mountCount} 条挂载 → mount.txt`);

  // 6. 内核模块
  console.log("[6/6] 内核模块...");
  const lsmod = await $`adb shell lsmod`.text();
  await writeFile(join(OUT_DIR, "lsmod.txt"), lsmod);
  const modCount = lsmod.split("\n").length - 1;
  console.log(`  → ${modCount} 个模块 → lsmod.txt`);

  // 总结
  console.log("");
  console.log("=".repeat(50));
  console.log("  提取完成");
  const files = await Bun.$`ls -lh ${OUT_DIR}/`.text();
  console.log(files);
  console.log("=".repeat(50));
}

run().catch(console.error);
