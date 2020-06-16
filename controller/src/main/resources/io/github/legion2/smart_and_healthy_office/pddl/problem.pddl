(define (problem test)

(:domain smart-and-healthy-office)

(:objects
    office - room
    test - room
    user1 - user
    user2 - user
    user3 - user
)

(:init
    (is_currently_at user1 office)
    (is_currently_at user2 office)
    (is_currently_at user3 test)
    (= (stress office) 10)
    (= (stress test) 5)
    (= (stress_plus_changing_room office) 15)
    (= (stress_plus_changing_room test) 10)
    (= (total-cost) 0)
)


(:goal
    (forall (?u - user) (exists (?r - room) (is_next_at ?u ?r)))
)
(:metric minimize (total-cost))
)
