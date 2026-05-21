---
title: "Edge Device 번호판 검출"
date: "2026-05-21"
category: "Project"
tags: ["Object Detection", "Edge AI", "NVIDIA Jetson", "DeepStream"]
---

## 프로젝트 개요

NVIDIA Jetson 기반 엣지 디바이스에서 4K 고해상도 CCTV 영상을 실시간으로 처리하여 차량 번호판을 검출하는 시스템입니다. 실제 납품 프로젝트로, 현장 환경에 맞춘 최적화를 수행했습니다.

## 핵심 과제: 4K 실시간 처리

엣지 디바이스의 제한된 연산 자원으로 4K (3840×2160) 영상을 실시간 처리하는 것이 가장 큰 도전이었습니다. 일반적인 방법으로는 처리 속도 요건을 충족할 수 없었습니다.

## 프레임 분할 알고리즘

**핵심 아이디어**: 4K 프레임을 여러 개의 작은 영역으로 분할하여 각각 처리합니다.

- 프레임을 겹치는 구역(overlap region)으로 분할
- 각 구역에서 독립적으로 번호판 검출 수행
- 구역 경계에서의 번호판 누락 방지를 위한 경계 처리 로직 구현
- 최종 결과 병합 및 중복 제거 (NMS 적용)

## 성과

| 지표 | 개선 전 | 개선 후 |
|------|---------|---------|
| F1-score | 88.25% | **93.48%** |

## 기술 스택

- **NVIDIA DeepStream SDK**: 엔드-투-엔드 파이프라인 구축
- **NVIDIA Jetson**: 엣지 디바이스 배포
- **TensorRT**: 모델 최적화 및 추론 가속화

## 연구 성과

- **Object Detection Method Using Frame Partitioning for Vehicle License Plate Detection** — IPIU 2025 발표
- 연구 기간: 2024.09 — 2025.02
