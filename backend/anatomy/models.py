from django.db import models

class BodyPart(models.Model):
    SYSTEM_CHOICES = [
        ('skeleton', 'Squelette'),
        ('organs', 'Organes'),
        ('muscles', 'Muscles'),
        ('nervous', 'Système nerveux'),
        ('blood', 'Système sanguin'),
    ]
    name = models.CharField(max_length=100)
    system = models.CharField(max_length=20, choices=SYSTEM_CHOICES)
    model_file = models.CharField(max_length=200)
    description = models.TextField(blank=True)

    def __str__(self):
        return f"{self.name} ({self.system})"

class Annotation(models.Model):
    body_part = models.ForeignKey(BodyPart, on_delete=models.CASCADE, related_name='annotations')
    label = models.CharField(max_length=100)
    description = models.TextField()
    x = models.FloatField()
    y = models.FloatField()
    z = models.FloatField()

    def __str__(self):
        return f"{self.label} - {self.body_part.name}"
