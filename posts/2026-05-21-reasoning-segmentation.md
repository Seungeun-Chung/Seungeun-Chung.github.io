---
title: "Reasoning Segmentation via Prompting LLMs"
date: "2026-05-21"
category: "Research"
tags: ["MLLM", "Reasoning Segmentation", "CoT Prompting", "In-Context Learning"]
---

## 프로젝트 개요

복잡한 자연어 명령(예: "냉장고 옆에 있는 의자")을 해석하여 이미지에서 해당 객체를 정확히 분할(Segmentation)하는 파이프라인을 개발하는 연구입니다. 단순한 키워드 매칭이 아닌, 문맥과 공간 관계를 추론해야 하는 Reasoning Segmentation 문제를 다룹니다.

## 문제 정의

기존 Segmentation 모델은 명확한 명사 쿼리(예: "의자")에 잘 동작하지만, 복잡한 관계형 표현이나 암묵적 지식을 요구하는 쿼리에는 취약합니다. 이 연구는 MLLM의 언어 이해 능력을 활용해 이러한 한계를 극복합니다.

## 접근 방법

**Chain-of-Thought (CoT) 프롬프팅**을 통해 모델이 복잡한 쿼리를 단계적으로 분해하도록 유도합니다. 또한 **In-Context Learning**을 적용하여, 예시 쌍(query-mask)을 제공함으로써 별도의 파인튜닝 없이 새로운 쿼리에 대응할 수 있게 합니다.

### 파이프라인 구조

1. 복잡한 텍스트 쿼리 입력
2. MLLM이 CoT를 통해 쿼리를 단순 표현으로 분해
3. 분해된 표현을 Segmentation 모델의 쿼리로 변환
4. 최종 마스크 생성 및 출력

## 현재 진행 상황

- 2025.05 — 현재 진행 중
- IPIU 2026 워크숍 논문 발표 완료 (우수 포스터 발표상 수상)

## 관련 논문

- **Enhancing Reasoning Segmentation via MLLM-based In-Context Learning** — IPIU 2026
