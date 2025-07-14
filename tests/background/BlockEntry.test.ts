import { describe, expect, test } from "@jest/globals";
import { BlockEntry } from "../../src/background/BlockEntry";

describe("BlockEntry module", () => {
  describe("Constructor validation", () => {
    test("should reject start time in invalid format", () => {
      expect(() => {
        new BlockEntry("Example", "example.com", "0000", "23:59");
      }).toThrow(Error);
    });
    test("should reject end time in invalid format", () => {
      expect(() => {
        new BlockEntry("Example", "example.com", "00:00", "2359");
      }).toThrow(Error);
    });
    test("should reject start time outside valid time range", () => {
      expect(() => {
        new BlockEntry("Example", "example.com", "24:00", "23:59");
      }).toThrow(Error);
    });
    test("should reject end time outside valid time range", () => {
      expect(() => {
        new BlockEntry("Example", "example.com", "00:00", "24:00");
      }).toThrow(Error);
    });
  });
  describe("Matching functionality", () => {
    test("should match entry by exact URL", () => {
      expect(
        new BlockEntry(
          "Example",
          "example.com",
          "00:00",
          "23:59",
          () => "00:00"
        ).match("example.com")
      ).toBe(true);
    });
    test("should match with inclusive start time", () => {
      expect(
        new BlockEntry(
          "Example",
          "example.com",
          "00:01",
          "23:59",
          () => "00:01"
        ).match("example.com")
      ).toBe(true);
    });
    test("should match with inclusive end time", () => {
      expect(
        new BlockEntry(
          "Example",
          "example.com",
          "00:00",
          "23:58",
          () => "23:58"
        ).match("example.com")
      ).toBe(true);
    });
    test("should not match if time before range", () => {
      expect(
        new BlockEntry(
          "Example",
          "example.com",
          "00:01",
          "23:59",
          () => "00:00"
        ).match("example.com")
      ).toBe(false);
    });
    test("should not match if time after range", () => {
      expect(
        new BlockEntry(
          "Example",
          "example.com",
          "00:00",
          "23:58",
          () => "23:59"
        ).match("example.com")
      ).toBe(false);
    });
    test("should match wrapping around day if start time after end time", () => {
      expect(
        new BlockEntry(
          "Example",
          "example.com",
          "12:00",
          "11:59",
          () => "23:59"
        ).match("example.com")
      ).toBe(true);
    });
    test("should not match wrapping around day time after end time", () => {
      expect(
        new BlockEntry(
          "Example",
          "example.com",
          "12:01",
          "11:59",
          () => "12:00"
        ).match("example.com")
      ).toBe(false);
    });
    test("should not wrap around day if times are equal", () => {
      expect(
        new BlockEntry(
          "Example",
          "example.com",
          "12:00",
          "12:00",
          () => "12:01"
        ).match("example.com")
      ).toBe(false);
    });
    test("should not match if URLs are fully different", () => {
      expect(
        new BlockEntry(
          "Example",
          "abc.xyz",
          "00:00",
          "23:59",
          () => "00:01"
        ).match("def.net")
      ).toBe(false);
    });
    test("should match using regex if using slashes", () => {
      expect(
        new BlockEntry(
          "Example",
          "/a\\.com/",
          "00:00",
          "23:59",
          () => "00:01"
        ).match("aaaa.com")
      ).toBe(true);
    });
  });
});
