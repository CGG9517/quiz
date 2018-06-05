package info.quiz.vo;

public class RecordPairs {
    private int round;
    private double score;

    public RecordPairs(int round, double score) {
        this.round = round;
        this.score = score;
    }

    public int getRound() {
        return round;
    }

    public double getScore() {
        return score;
    }
}
