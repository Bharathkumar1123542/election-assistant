from typing import List


def split_paragraphs(text: str) -> List[str]:
    return [paragraph.strip() for paragraph in text.split('\n\n') if paragraph.strip()]
