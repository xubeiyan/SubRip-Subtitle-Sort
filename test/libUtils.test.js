import { expect, test } from "vitest";
import { sortSRTFileByStartTime } from "../src/lib/utils";

test("empty source file get empty result", () => {
	const origin = "";
	const sorted = "";

	expect(sortSRTFileByStartTime(origin)).toBe(sorted);
});

test("correct srt", () => {
	const origin = `1\n00:00:00,000 --> 00:00:00,500\ntest`;
	const sorted = `1\n00:00:00,000 --> 00:00:00,500\ntest`;

	expect(sortSRTFileByStartTime(origin)).toBe(sorted);
});

test("CR case", () => {
	const origin = `1\r00:00:00,000 --> 00:00:00,500\rtest`;
	const sorted = `1\n00:00:00,000 --> 00:00:00,500\ntest`;

	expect(sortSRTFileByStartTime(origin)).toBe(sorted);
});

test("CR LF case", () => {
	const origin = `1\r\n00:00:00,000 --> 00:00:00,500\r\ntest`;
	const sorted = `1\n00:00:00,000 --> 00:00:00,500\ntest`;

	expect(sortSRTFileByStartTime(origin)).toBe(sorted);
});

test("multiple lines", () => {
	const origin = `1\n00:00:00,000 --> 00:00:00,500\nline1\n2\n00:00:01,000 --> 00:00:02,333\nline2`;
	const sorted = `1\n00:00:00,000 --> 00:00:00,500\nline1\n2\n00:00:01,000 --> 00:00:02,333\nline2`;

	expect(sortSRTFileByStartTime(origin)).toBe(sorted);
});

test("multiple lines sort", () => {
	const origin = `1\n00:00:01,000 --> 00:00:01,500\nline2\n\n2\n00:00:00,000 --> 00:00:01,333\nline1`;
	const sorted = `1\n00:00:00,000 --> 00:00:01,333\nline1\n\n2\n00:00:01,000 --> 00:00:01,500\nline2`;

	expect(sortSRTFileByStartTime(origin)).toBe(sorted);
});

test("multiple lines minute sort", () => {
	const origin = `1\n00:01:01,000 --> 00:01:01,500\nline2\n\n2\n00:00:00,000 --> 00:00:01,333\nline1`;
	const sorted = `1\n00:00:00,000 --> 00:00:01,333\nline1\n\n2\n00:01:01,000 --> 00:01:01,500\nline2`;

	expect(sortSRTFileByStartTime(origin)).toBe(sorted);
});

test("multiple lines hour sort", () => {
	const origin = `1\n01:01:01,000 --> 01:01:01,500\nline2\n\n2\n00:00:00,000 --> 00:00:01,333\nline1`;
	const sorted = `1\n00:00:00,000 --> 00:00:01,333\nline1\n\n2\n01:01:01,000 --> 01:01:01,500\nline2`;

	expect(sortSRTFileByStartTime(origin)).toBe(sorted);
});

test("miss content", () => {
	const origin = `1\n01:01:01,000 --> 01:01:01,500\n\n2\n00:00:00,000 --> 00:00:01,333\nline1`;
	const sorted = `1\n00:00:00,000 --> 00:00:01,333\nline1`;

	expect(sortSRTFileByStartTime(origin)).toBe(sorted);
});