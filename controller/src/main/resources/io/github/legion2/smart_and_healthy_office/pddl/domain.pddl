(define (domain smart-and-healthy-office)

(:requirements :strips :typing :negative-preconditions :action-costs :equality)

(:types room user)

(:predicates
    (is_currently_at ?u - user ?r - room)
    (is_next_at ?u - user ?r - room)
)

(:functions (total-cost)
            (stress ?r - room)
            (stress_plus_changing_room ?r - room))

(:action not_change_room
    :parameters (?u - user ?r - room)
    :precondition (and (is_currently_at ?u ?r))
    :effect (and (is_next_at ?u ?r)
                 (not (is_currently_at ?u ?r))
                 (increase (total-cost) (stress ?r)))
)

(:action change_room
    :parameters (?u - user ?r1 - room ?r2 - room)
    :precondition (and (is_currently_at ?u ?r1) (not (= ?r1 ?r2)))
    :effect (and (is_next_at ?u ?r2)
                 (not (is_currently_at ?u ?r1))
                 (increase (total-cost) (stress_plus_changing_room ?r2)))
)

)
