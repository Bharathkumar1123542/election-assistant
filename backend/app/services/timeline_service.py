from app.schemas.timeline import TimelineResponse

class TimelineService:
    def get_timeline(self) -> TimelineResponse:
        return TimelineResponse(
            steps=[
                {
                    'title': 'Register to vote',
                    'description': 'Submit your voter registration before the deadline.',
                    'date': '2026-10-01',
                    'completed': False,
                },
                {
                    'title': 'Locate polling place',
                    'description': 'Find your local polling station and opening hours.',
                    'date': '2026-10-15',
                    'completed': False,
                },
                {
                    'title': 'Vote',
                    'description': 'Cast your ballot on election day or using early voting.',
                    'date': '2026-11-05',
                    'completed': False,
                },
            ]
        )
