package com.accessjobhub.util;

public final class StringUtils {

    private StringUtils() {
    }

    public static String blankToNull(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }
        return value.trim();
    }
}
